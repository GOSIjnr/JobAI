# Jobify Ecosystem

API Gateway, Session Management, and Multi-Frontend Integration – Technical Specification

## 1. Purpose and Scope

- Define how the API Gateway mediates traffic between multiple frontends (Next.js app, marketing site, admin console, partner apps) and multiple backends (Node/TypeScript app backend, Python RoadmapService, .NET/C# services).

- Standardize authentication, session storage, cookies, CORS, identity propagation, and public/protected route handling.

- Provide implementation-ready details: headers, cookie attributes, Redis schema, error codes, observability, rollout plan, and local development guidance.

## 2. Repository Context

Current services in plan:

| Service                  | Language    | Frontend         |
|--------------------------|------------|----------------|
| API Gateway / Auth       | C#         | No frontend     |
| Ecom Service             | C#         | Frontend        |
| Matching Service         | TypeScript | Frontend        |
| Roadmap Service          | Python     | Frontend        |
| Matching AI              | Python     | No frontend     |
| Admin Frontend           | -          | Frontend across all services |

> **Afterthought:**
> To organize this project efficiently in GitHub, we can separate backends and frontends into their own repositories. The frontends would primarily use **React** (or React-based frameworks), independent of the backend language:
>
> - `api-gateway-auth` (C#) – **Backend only**
> - `ecom-service-backend` (C#) – **Backend only**
> - `ecom-service-frontend` (React) – **Frontend only**
> - `matching-service-backend` (TypeScript / Node.js) – **Backend only**
> - `matching-service-frontend` (React) – **Frontend only**
> - `roadmap-service-backend` (Python / FastAPI or Django) – **Backend only**
> - `roadmap-service-frontend` (React) – **Frontend only**
> - `matching-ai` (Python) – **Backend only**
> - `admin-frontend` (React) – **Frontend across all services**
>
> This structure decouples frontend and backend development, allowing independent deployments, clearer CI/CD pipelines, and specialized team ownership. Frontends are unified with React for consistency across the project.

## 3. High-Level Architecture

- **Single Entry:** All client traffic goes to the API Gateway only. No direct calls to internal services from browsers.

- **Responsibilities at Gateway:**
  - Session establishment and validation (via Redis and DB)
  - Cookie issuance/rotation/clearing
  - Public vs Protected vs Enriched route evaluation
  - Identity propagation to downstream services via signed headers
  - CORS and CSRF handling for browser apps
  - Rate limiting, request/response logging, metrics, and tracing
  - Optional protocol translation (HTTP/1.1↔HTTP/2), request normalization

- **Responsibilities at Services:**
  - Trust the gateway identity headers after signature verification
  - Perform authorization (RBAC/ABAC) based on propagated claims
  - Do not read or write cookies (stateless w.r.t. browser)
  - Rate limiting can also be implemented in the seperate services but meaning we would have to not do it on the gateway
  - we can also do api message normalization and wrapping here but the api gateway would be better for that

**Diagram of the high-level architecture:**
```
Clients (Web, Admin, Partner, Mobile)
        |
        v
+-----------------------------+
|        API Gateway          |
|  - Cookie/Session Mgmt      |
|  - Route Policy             |
|  - Identity Headers (HMAC)  |
|  - CORS/CSRF                |
|  - Rate Limit/Observability |
+-----------------------------+
        |
        v
+--------------+  +--------------+  +-----------------+
| Matching     |  | Roadmap      |  | Ecom            |
| (Node/TS)    |  | (Python)     |  | (C#/.NET)       |
+--------------+  +--------------+  +-----------------+
```

## 4. Domains and Origins Strategy (Multi-Frontend)

- **Production domains (recommended):**
  - Gateway: `https://api.jobify.com`
  - Frontends:
    - Marketing site (static/SSR): `https://www.jobify.com`
    - App (Next.js): `https://app.jobify.com`
    - Admin console: `https://admin.jobify.com`

- **Cookie scope:** session cookie set on parent domain `.jobify.com` to allow first-party cookie access by all subdomains while remaining HttpOnly.

- **Staging/Preview:** use a single parent domain (e.g., *.stg.jobify.com) with the same policy.

- **Local development:**
  - Gateway: `https://localhost:5001`
  - App: `https://localhost:3000`
  - Admin: `https://localhost:3001`
  - Cookie Domain: localhost (no leading dot), SameSite=None; Secure (use HTTPS via dev certificate).

- **Cross-domain partners (e.g., partner.com):** modern browsers block third-party cookies. Use a standards-based SSO pattern (OIDC/OAuth2) or a frontend redirect flow rather than trying to share cookies across unrelated eTLD+1.

## 5. Cookie Model (Gateway-managed)

- Cookie Name: `jobify.sid`
- Value: Opaque sessionId (UUIDv4 or 128-bit random; no PII or claims)

- Attributes:
  - Secure: true (always in prod; in dev if HTTPS)
  - HttpOnly: true
  - SameSite: None (supports cross-subdomain frontends and embedded contexts)
  - Path: /
  - Domain: .jobify.com in prod; localhost in local dev; configurable via env GATEWAY_COOKIE_DOMAIN
  - Max-Age/Expires: sliding TTL (e.g., 7200s) with absolute cap

- Rotation:
  - Refresh session expiry on each authorized request (sliding window) up to absolute cap
  - Optionally rotate sessionId on sensitive events (privilege change, password reset) and update Redis atomically

- Logout:
  - Gateway deletes Redis session and sets Set-Cookie with Max-Age=0 to clear client cookie

``` js
Example Set-Cookie (prod):
Set-Cookie: jobify.sid=3c7a...; Path=/; Domain=.jobify.com; HttpOnly; Secure; SameSite=None; Max-Age=7200
```

## 6. CORS Policy at Gateway

- Allowed origins: explicit list (e.g., `https://www.jobify.com`, `https://app.jobify.com`, `https://admin.jobify.com`)
- Allowed methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`
- Allowed headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token
- Credentials: true (so cookies are sent); set Vary: Origin
- Preflight cache: 600s
- Frontend requirement: use fetch/XHR with credentials: 'include'

## 7. CSRF Protection

- For state-changing requests from browser apps:
  - Double-submit token pattern:
    - Gateway issues a non-HttpOnly CSRF cookie jobify.csrf with a random token tied to the session in Redis.
    - Frontend reads jobify.csrf and sends it in header X-CSRF-Token for unsafe methods (POST, PUT, PATCH, DELETE).
    - Gateway validates the token against Redis and session sid before proxying.

- Alternative (optional for SSR forms): SameSite=Lax with per-form token; for API-first SPA, double-submit is preferred.

8. Session Storage (Redis)
- Key: sess:{sessionId}
- Value JSON:

```json
  {
    "sub": "user-uuid",
    "sid": "session-uuid",
    "roles": ["user", "admin"],
    "scopes": ["jobs:read", "payments:write"],
    "createdAt": "ISO-8601",
    "lastSeenAt": "ISO-8601",
    "expiresAt": "ISO-8601",
    "absoluteExpiresAt": "ISO-8601",
    "ip": "last-client-ip",
    "ua": "last-user-agent-hash"
  }
```

- TTL: Redis TTL equals sliding window, enforced on write/refresh.

- Indexes (optional):
  - user->sessions set: user:{sub}:sessions => {sid}
  - revocation list for global logout and device management

## 9. Route Classification

- **Public routes:** no cookie required; no identity headers added
  - Examples: GET /public/*, GET /health, GET /roadmaps/* (read-only)

- **Protected routes:** valid session required; identity headers injected
  - Examples: POST /jobs/apply, GET /me, POST /orders

- **Enriched routes:** allow anonymous but enrich if session exists (graceful auth)
  - Example: GET /recommendations (personalize when logged in)

- **Route table managed via config:**
  - GATEWAY_PUBLIC_PATHS=/public/*,/health
  - GATEWAY_ENRICH_PATHS=/recommendations,/search

## 10. Identity Propagation (Signed Headers)

- Headers from Gateway to Services:
  - X-Jobify-User: base64url(JSON payload below)
  - X-Jobify-Signature: hex HMAC-SHA256 over X-Jobify-User using SHARED_HMAC_KEY
  - X-Jobify-Request-Id: uuid for per-request tracing
  - X-Jobify-Key-Id: key identifier for key rotation

- Payload (minimal claims):

``` json
  {
    "sub": "user-uuid",
    "sid": "session-uuid",
    "roles": ["user", "admin"],
    "scopes": ["jobs:read"],
    "iat": 1736112000, // issued-at epoch seconds
    "exp": 1736115600  // short-lived, e.g., now + 5 minutes
  }
```

- Rationale: backends never parse cookies; they only verify signature and read this payload.
- Clock Skew: backends allow ±60s when validating exp.
- Key rotation: include X-Jobify-Key-Id so services can resolve the correct key.

## 11. Gateway Request Processing Pipeline

1) Normalize request
    - Validate Host header, parse path, attach request-id

2) Route classification
   - If path matches Public: proxy immediately
   - Else if Protected or Enriched: proceed to session

3) Session handling
   - Read cookie jobify.sid
   - If missing and route Protected: 401 with problem+json
   - If present: fetch Redis session; if not found/expired: 401 and clear cookie
   - If found: refresh TTL and lastSeenAt

4) CSRF (unsafe methods from browsers)
   - Validate X-CSRF-Token against jobify.csrf and session sid

5) Identity envelope (Protected or Enriched with session)
   - Build minimal claims, sign, attach headers

6) Downstream call
   - Forward to service origin based on route map (service discovery or static map)

7) Response handling
   - Map downstream status to client; on 401 from service, do not auto-clear cookie unless signature deemed invalid

8) Observability
   - Emit structured logs, metrics, tracing spans

## 12. Routing and Service Discovery

- Static map via config (YAML/env) or dynamic from service registry.

- Example map:
  - /api/jobs/* → http://jobs-svc:8080 (backend Node/TS)
  - /api/roadmaps/* → http://roadmap-svc:8000 (RoadmapService Python)
  - /api/payments/* → http://payments-svc:5000 (future C#/.NET)

- Health probes: /health proxied to each service or answered by gateway with aggregate.

13. Implementation Sketches
A) Gateway (.NET Minimal API + YARP or custom middleware)
- Middleware order: CORS → RequestId → RoutePolicy → Session → CSRF → Identity → ReverseProxy → Response Logging
- Pseudocode outline:

``` cs
  app.UseCors(policy => policy.WithOrigins(allowedOrigins)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

  app.Use(async (ctx, next) => { ctx.Items["reqId"] = Guid.NewGuid(); await next(); });
  app.Use(RoutePolicyMiddleware);
  app.Use(SessionMiddleware);
  app.Use(CsrfMiddleware);
  app.Use(IdentityMiddleware);
  app.MapReverseProxy();

  // SessionMiddleware (core outline)
  if (IsPublic(ctx.Request)) return next();
  var sid = ctx.Request.Cookies["jobify.sid"];
  if (string.IsNullOrEmpty(sid)) return Unauthorized();
  var sess = await redis.GetAsync($"sess:{sid}");
  if (sess is null) { ClearCookie(); return Unauthorized(); }
  RefreshTtl(sess);

  // IdentityMiddleware
  var claims = BuildClaims(sess);
  var payload = Base64Url(Json.Serialize(claims));
  var (keyId, key) = ResolveHmacKey();
  var sig = Hmac(payload, key);
  ctx.Request.Headers["X-Jobify-User"] = payload;
  ctx.Request.Headers["X-Jobify-Signature"] = sig;
  ctx.Request.Headers["X-Jobify-Key-Id"] = keyId;
```

B) Service (FastAPI example)

``` py
  def gateway_identity(request: Request):
      payload = request.headers.get("X-Jobify-User")
      sig = request.headers.get("X-Jobify-Signature")
      key_id = request.headers.get("X-Jobify-Key-Id")
      key = resolve_key(key_id)
      if not payload or not sig or not key:
          raise HTTPException(401)
      if not hmac_verify(payload, sig, key):
          raise HTTPException(401)
      claims = json.loads(base64url_decode(payload))
      if claims['exp'] < now() - 60: raise HTTPException(401)
      return claims
```

C) Node/Express service

``` ts
  app.use((req, res, next) => {
    const p = req.header('X-Jobify-User');
    const s = req.header('X-Jobify-Signature');
    const kid = req.header('X-Jobify-Key-Id');
    const key = resolveKey(kid);
    if (!p || !s || !key) return res.sendStatus(401);
    if (!verifyHmac(p, s, key)) return res.sendStatus(401);
    const claims = JSON.parse(base64url.decode(p));
    if (claims.exp < Date.now()/1000 - 60) return res.sendStatus(401);
    req.user = claims; next();
  });
```

## 13. API Responses

The services in our architecture are intended to return structured responses that align with the requirements of the API Gateway. Ideally, each service would follow a consistent format so that the Gateway can take the response, apply any necessary transformations, and forward it to the client. This ensures that clients see a unified interface and allows us to enforce consistency, logging, and error handling centrally.

In the early stages of development, however, we plan to keep this process flexible. The Gateway will essentially act as a pass-through or “dummy” layer, allowing each subservice to return whatever format it chooses. This approach gives teams the freedom to develop and iterate on their services independently, without being constrained by strict response contracts from the start.

By designing with the Gateway in mind, we establish a single point of integration for clients. This strategy balances short-term flexibility with long-term maintainability: it enables rapid development while leaving room for standardization in the future. As the system evolves, we can gradually introduce stricter response formats and transformations at the Gateway, ensuring that the client always receives clean, consistent, and predictable responses.

## 14. More Wild Thoughts

- Idea: Make the API Gateway a **routing-only service** with no authentication.
- Authentication is handled by a **separate Auth microservice**, alongside other microservices.

**Pros:**
- Separation of concerns → simpler gateway and services.
- Scalable independently (gateway vs auth load).
- Flexible auth strategies (JWT, OAuth, SSO) without touching the gateway.

**Flow:**

```
Client --> API Gateway (routing) --> Auth Service --> Microservices
```

- Microservices can validate tokens themselves or trust the Auth Service.
- Centralizes auth logic, improves reusability and security isolation.

Here’s the **shortened README version with a concrete example added**, still concise enough for section 15:

---

## 15. API Routes and Versioning

API routes are intentionally **not versioned** (e.g. `/api/jobs` instead of `/api/v1/jobs`).

Versioning is mainly required for **public or third-party APIs** where clients cannot be upgraded in sync. In our system, we **control all internal services and deployments**, so APIs evolve together. Adding route versions for internal APIs would introduce unnecessary complexity and maintenance overhead.

We rely instead on:

* Backward-compatible changes
* Coordinated deployments
* Feature flags and contract validation

**Exception (when versioning is allowed):**
If a route is **publicly exposed** or intended for **external consumers**, versioning may be introduced.

**Example:**
If we expose a public endpoint that allows third parties to fetch a user’s Jobify profile (e.g. to display it on a GitHub README via a third-party service or widget), that route would be versioned to ensure long-term stability for external integrations.

In short: **no versioning for internal APIs we fully control; versioning only for public or third-party-facing routes.**

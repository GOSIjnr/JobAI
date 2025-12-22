# API Reference

## Backend

### `GET /api/questions`
Returns the list of psychological questions.

**Response:**
```json
[
  { "id": "1", "text": "Question 1", "category": "personality" }
]
```

### `POST /api/answers`
Submits user answers.

**Body:**
```json
{
  "userId": "uuid",
  "answers": ["Answer 1", "Answer 2"]
}
```

**Response:**
```json
{
  "success": true,
  "traits": ["Trait A", "Trait B"],
  "matches": [...]
}
```

## AI Service

### `POST /extract-traits`
Extracts traits from text answers.

**Body:**
```json
{
  "answers": ["Answer 1", "..."]
}
```

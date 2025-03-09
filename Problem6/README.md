# Scoreboard API Module Specification

## 📖 Overview

This module provides a real-time scoreboard system for a website. The scoreboard displays the **top 10 users** based on their scores. Users can increase their scores by performing specific actions. The API ensures secure score updates and prevents unauthorized manipulation.

## 🎯 Features

- **Retrieve the Top 10 Users**: Fetches the highest-scoring users in real-time.
- **Secure Score Update**: Users can increase their scores by completing an action.
- **Real-time Updates**: Uses WebSockets or Server-Sent Events (SSE) for live scoreboard updates.
- **Authentication & Security**: Ensures only legitimate actions can increase scores.

---

## API Endpoints

### 1. ** Get Top 10 Users**

**`GET /scoreboard/top`**

**📌 Description:**  
Retrieves the **top 10 users** with the highest scores.

**📥 Request:**  
_No parameters required._

**📤 Response (200 OK):**

```json
{
  "topUsers": [
    { "id": "user1", "username": "Alice", "score": 1200 },
    { "id": "user2", "username": "Bob", "score": 1100 },
    ...
  ]
}
```

### 2. ** Completes an action**
**`POST /scoreboard/complete-action`**

**📌 Description:**  
User do an action and completing it will increase score.

**📥 Request Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**📥 Request:**  
```json
{ 
    "userId": "user1", 
    "actionId": "action1", 
    "increment": 10
}
```

**📤 Response (200 OK):**

```json
{
  "message": "Score updated successfully",
  "newScore": 1210
}
```

**📤 Response (400 BadRequest):**

```json
{
  "message": "Bad request",

}
```

**📤 Response (403 Forbidden - UnAuthorized):**

```json
{
  "message": "Unauthorized",
}
```


### ** additional comments for improvement **

1. **Cache leaderboard using Redis**:

- Avoids frequent database queries.
- Improves performance for real-time scoreboard updates.

2.**Use message queue (kafka/ rabbitmq) for scalability**:

- Handles massive score updates efficiently.

# Notes for what I learned

*This is where I will make notes about what I learned in this project especially about **JSON** and the **DOM** which are concepts I am not familiar with.*

---

## JavaScript Object Notation (JSON)

Lightweight text-based format used for storing and exchanging data - **My thought would be that this is like a database and API at the same time**.

### JSON is built on two structures:

-   **Objects**: Collection of key/value pairs enclosed in curly braces `{}`.
-   **Arrays**: Ordered lists of values enclosed in square brackets `[]`.

### Common uses of JSON:

-   **Web API**: Servers send data to web pages in JSON format.
-   **Configuration Files**: Many applications uses JSON to store settings and configurations.
-   **Data Storage**: Some databases, like *MongoDB*, stores data in a JSON-like format.

### Example of a JSON program:

```json

{
    "name": "Bukeka Nxumalo",
    "age": 20,
    "skills": [
        "HTML",
        "CSS",
        "JavaScript"
    ],
    "isStudent": true
}

```

### How will I implement it:

1. By using **fetch().then().catch()** syntax which I will also be learning in this project

```javascript

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))

```

-   `fetch()` function sends an **HTTP request** to the given `url`.
-   It ruturns a **Promise** that resolves to a **Response** object.
-   *Doest not immediately return data* - instead we have to handle the response **asynchronously**.

-   The firts `.then()` runs when `fetch()` successfully completes.
-   **Response** object contains *metadata*.
-   We use `.json()` to extract the actual data.

-   The second `.then()` recieves the actual JSON data.
-   We can now use the data however we want.

-   If any error occurs `.catch()` runs and it handles *rejected Promises* and prevents the script from crashing

2. By using **async/await** which is more cleaner

```javascript

async function fetchData() {
    try {
        let response = await fetch(url)
        let data = await response.json()

        consle.log(data)
    } catch (error) {
        console.error('Error:', error)
    }
}

fetchData()

```

**fetch().then().catch()** is a **Promise-based** way to handle API calls.
**async/await** is more readable alternative.

---

## Document Object Model (DOM)

A programming interface for *web documents*, representing the structure and content od **HTML/XML** documents as a *tree of objects*.
*Each part of the document is represented as a node in this tree. This hierarchical model allows programming languages to access and manipulate the document's structur, style and content **dynamically***.

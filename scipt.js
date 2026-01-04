let posts = [];
let currentRole = null;

/* =========================================================
   PREPARED STATEMENTS (SIMULATED)
   ---------------------------------------------------------
   In backend (PDO/MySQLi), prepared statements separate
   query & data. Here we simulate this by sanitizing input
   before processing or storing it.
========================================================= */
function sanitizeInput(input) {
    return input.replace(/[<>"'`;]/g, "");
}

/* =========================================================
   USER ROLES & PERMISSIONS
========================================================= */
function loginUser() {
    const role = document.getElementById("roleSelect").value;
    const msg = document.getElementById("loginMessage");

    if (!role) {
        msg.style.color = "red";
        msg.textContent = "Please select a role.";
        return;
    }

    currentRole = role;
    localStorage.setItem("userRole", role);

    msg.style.color = "green";
    msg.textContent = `Logged in as ${role.toUpperCase()}`;

    if (role === "admin" || role === "editor") {
        document.getElementById("postForm").classList.remove("hidden");
    } else {
        document.getElementById("postForm").classList.add("hidden");
    }
}

/* =========================================================
   FORM VALIDATION
   - Client-side validation
   - Simulated server-side validation logic
========================================================= */
function validateForm(title, content) {
    if (title.length < 3) {
        return "Title must be at least 3 characters.";
    }
    if (content.length < 10) {
        return "Content must be at least 10 characters.";
    }
    return null;
}

/* =========================================================
   ROLE-BASED ACCESS CONTROL
========================================================= */
function createPost() {
    const msg = document.getElementById("formMessage");

    if (currentRole !== "admin" && currentRole !== "editor") {
        msg.style.color = "red";
        msg.textContent = "Access denied: insufficient permissions.";
        return;
    }

    let title = sanitizeInput(document.getElementById("title").value.trim());
    let content = sanitizeInput(document.getElementById("content").value.trim());

    const error = validateForm(title, content);
    if (error) {
        msg.style.color = "red";
        msg.textContent = error;
        return;
    }

    posts.push({ title, content });
    msg.style.color = "green";
    msg.textContent = "Post added successfully.";

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    renderPosts();
}

/* =========================================================
   DISPLAY POSTS
========================================================= */
function renderPosts() {
    const container = document.getElementById("postList");
    container.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        container.appendChild(div);
    });
}

// Initialize user data from localStorage or an empty array
let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
let currentUser = null;

// Handle login functionality
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = usersData.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    alert('Login successful!');
    showEditorPage();
  } else {
    alert('Invalid username or password.');
  }
});

// Register a new user
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  if (usersData.find(u => u.username === newUsername)) {
    alert('This username is already taken!');
  } else {
    const newUser = { username: newUsername, password: newPassword };
    usersData.push(newUser);
    localStorage.setItem('usersData', JSON.stringify(usersData));

    alert('Registration successful!');
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
  }
});

// Toggle between login and register pages
document.getElementById('registerLink').addEventListener('click', function () {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'block';
});

document.getElementById('backToLogin').addEventListener('click', function () {
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
});

// Show editor page after login
function showEditorPage() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('editorPage').style.display = 'block';
  document.getElementById('welcomeMessage').textContent = currentUser.username;
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function () {
  currentUser = null;
  alert('You have been logged out.');
  document.getElementById('editorPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
});

// Change password functionality
document.getElementById('changePasswordButton').addEventListener('click', function () {
  const newPassword = prompt('Enter your new password:');
  if (newPassword) {
    currentUser.password = newPassword;
    localStorage.setItem('usersData', JSON.stringify(usersData));
    alert('Password changed successfully.');
  }
});

// Delete account functionality
document.getElementById('deleteAccountButton').addEventListener('click', function () {
  const confirmDelete = confirm('Are you sure you want to delete your account?');
  if (confirmDelete) {
    usersData = usersData.filter(u => u.username !== currentUser.username);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    alert('Account deleted successfully.');
    document.getElementById('editorPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
  }
});

// Save notes functionality with custom file name including extension
document.getElementById('saveButton').addEventListener('click', function () {
  const notes = document.getElementById('textEditor').value;
  if (notes.trim()) {
    const fileName = prompt('Enter file name with extension (e.g., notes.txt):', 'notes.txt');
    if (fileName && fileName.includes('.')) {
      const file = new Blob([notes], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = fileName;
      link.click();
    } else {
      alert('Invalid file name. Please include an extension (e.g., .txt).');
    }
  } else {
    alert('Please write something before saving!');
  }
});

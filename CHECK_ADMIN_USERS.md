# How to Check/Create Admin Users

## You're Correct!

The credentials are **NOT hardcoded** - they are stored in **Firebase Authentication**.

## To Access the Admin Panel:

### Option 1: Check Existing Users in Firebase Console

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com
   - Select your project

2. **Navigate to Authentication:**
   - Click on "Authentication" in the left sidebar
   - Click on the "Users" tab

3. **View Existing Users:**
   - You'll see a list of all registered users
   - Each user has an email address
   - These are your admin credentials

### Option 2: Create a New Admin User

If no users exist or you forgot the password:

1. **In Firebase Console → Authentication → Users:**
   - Click "Add User" button
   - Enter an email (e.g., `admin@alfaruq.com`)
   - Enter a password (make it secure!)
   - Click "Add User"

2. **Login with these credentials:**
   - Go to `/admin/login`
   - Use the email and password you just created

### Option 3: Create User Programmatically

I can create a simple page to register a new admin user. Would you like me to create:

1. A one-time setup page at `/admin/create-first-user`
2. That you can access without login
3. To create your first admin account
4. Then delete/disable the page after use

---

## Current Situation

Your login page ([app/admin/login/page.jsx](app/admin/login/page.jsx)) uses:
```javascript
signInWithEmailAndPassword(auth, email, password)
```

This means:
- ✅ No hardcoded credentials (secure!)
- ✅ Uses Firebase Authentication
- ✅ Users are stored in Firebase
- ❌ You need Firebase Console access OR
- ❌ A way to create the first user

## What Would You Like to Do?

**Choose one:**

A. **I have Firebase Console access** → Check the Authentication tab for existing users

B. **I don't have Firebase access** → I'll create a one-time user registration page

C. **I forgot my Firebase password** → Reset it at https://console.firebase.google.com

Let me know which option you prefer!
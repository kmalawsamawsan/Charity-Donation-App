import bcrypt

# كلمة المرور الأصلية
password = "Admin@123456".encode('utf-8')

# تشفير كلمة المرور
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

print(hashed_password.decode('utf-8'))  # طباعة النص المشفر
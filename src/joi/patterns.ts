const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;

const phoneRegex = /^((\+972|0)([234895]|5[024685]|77)-?[1-9]\d{6})$/;

export { passwordRegex, phoneRegex };

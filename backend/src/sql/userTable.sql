CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
    password VARCHAR(255) NOT NULL,
    refreshTokenHash VARCHAR(512) NULL,
    lastLogoutAt DATETIME NULL,
    lastLoginAt DATETIME NULL,
    lastRefreshAt DATETIME NULL,
    UNIQUE KEY users_email_uq (email),
    KEY users_refreshTokenHash_idx (refreshTokenHash),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

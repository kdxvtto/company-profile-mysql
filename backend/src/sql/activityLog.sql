CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action ENUM('create', 'update', 'delete') NOT NULL,
  resource ENUM('news', 'team', 'service', 'publication', 'gallery', 'user') NOT NULL,
  resourceName VARCHAR(255) NOT NULL,
  resourceId INT NOT NULL,
  userId INT NOT NULL,
  userName VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_activity_createdAt (createdAt),
  INDEX idx_activity_userId (userId),
  INDEX idx_activity_resource (resource),

  CONSTRAINT activity_logs_userId_fk FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

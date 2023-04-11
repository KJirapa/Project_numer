SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
use mydb;

CREATE TABLE mydb.Equation (
  Equation varchar(100) NOT NULL,
  Xl int(100) NOT NULL,
  Xr int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO mydb.Equation (`Equation`, `Xl`, `Xr`) VALUES
('x^4-13', 0, 2),
('x^2-7', 1, 3),
('x^x-2', 0, 3),
('x^3+x^2+2*x', 1, 5),
('x^3+x^4+16', 4, 8),
('x^3+x+5', 7, 9);
COMMIT;



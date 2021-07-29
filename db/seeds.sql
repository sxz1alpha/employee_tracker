INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO  roles (title, salary, department_id)
VALUES
    ('Sales Lead', 130000, 1),
    ('Sales Person', 80000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 150000, 2),
    ('Accountant', 80000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 2, NULL),
    ('Kevin', 'Tupik', 2, 3),
    ('Malia', 'Brown', 3, NULL),
    ('Sarah', 'Lourd', 4, NULL),
    ('Tom', 'Allen', 4, 6),
    ('Tammer', 'Galal', 1, 1);

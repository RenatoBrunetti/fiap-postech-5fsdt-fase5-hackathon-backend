insert into "Role" ("id", "name", "description") values
  (gen_random_uuid(), 'Admin', 'System Administrator Role'),
  (gen_random_uuid(), 'Teacher', 'Teacher Role'),
  (gen_random_uuid(), 'Student', 'Student Role');

insert into "User" ("id", "email", "password", "name", "document", "roleId") values
  (gen_random_uuid(), 'renan.santos@mail.com', '$2b$10$vYSmwST7/irgzVfcUE8bBO8Cc0SwU/7MPGAaaF57HW0QtvJFKDJp.', 'Renan Antônio Ferreira dos Santos', '90510462006', (select id from "Role" where name = 'Admin' limit 1)),
  (gen_random_uuid(), 'amanda.vettorazzo@mail.com', '$2b$10$Gqz3a/kaZPbWUNYD74.5n.loodMHu6V9/P0NvGb3S/3EJg8CNvjU2', 'Amanda Vettorazzo Carneiro', '93706164035', (select id from "Role" where name = 'Teacher' limit 1));

insert into "School" ("id", "name", "document") values
  (gen_random_uuid(), 'Escola Estadual Pierluigi Piazzi', '23823520000108'),
  (gen_random_uuid(), 'Escola Estadual Mário Sergio Cortella', '96997345000130');

insert into "Grade" ("id", "name", "category") values
  (gen_random_uuid(), 'Creche', 'Educação Infantil'),
  (gen_random_uuid(), 'Pré-Escola', 'Educação Infantil'),
  (gen_random_uuid(), '1º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '2º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '3º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '4º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '5º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '6º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '7º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '8º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '9º Ano', 'Ensino Fundamental'),
  (gen_random_uuid(), '1º Ano', 'Ensino Médio'),
  (gen_random_uuid(), '2º Ano', 'Ensino Médio'),
  (gen_random_uuid(), '3º Ano', 'Ensino Médio');

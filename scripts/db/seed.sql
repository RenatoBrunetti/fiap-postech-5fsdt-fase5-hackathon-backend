insert into "Role" ("id", "name", "description") values
  (gen_random_uuid(), 'Admin', 'System Administrator Role'),
  (gen_random_uuid(), 'Teacher', 'Teacher Role'),
  (gen_random_uuid(), 'Student', 'Student Role');

insert into "Grade" ("id", "name", "category", "countryId") values
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

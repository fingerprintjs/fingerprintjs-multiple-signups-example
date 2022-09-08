create table users (
   id serial primary key,
   email text not null unique,
   created_at timestamp default now()
);
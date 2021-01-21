create table users (
   id serial primary key,
   email text not null,
   created_at timestamp default now(),
   unique (email)
);
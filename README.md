# Joke Site

A simple, mobile‑first web app where users can post text jokes, browse others posts, rate them with like/dislike, and admins can remove inappropriate content for moderation. The goal is an interactive, responsive joke platform with popularity‑based discovery and straightforward UX.

## The stack

Frontend: HTML, CSS, JavaScript with mobile‑first, responsive design and dynamic UI updates.<img src="Docs/Images/css.svg" alt="Diagram" width="40" height="30"><img src="Docs/Images/html.svg" alt="Diagram" width="40" height="30"><img src="Docs/Images/js.svg" alt="Diagram" width="40" height="30">

Backend: Node.js with Express exposing a JSON REST API for auth, jokes, and ratings.<img src="Docs/Images/node.svg" alt="Diagram" width="40" height="30"><img src="Docs/Images/expres.svg" alt="Diagram" width="40" height="30">

Database: PostgreSQL with normalized schema and constraints for users, jokes, and ratings.<img src="Docs/Images/postgresql.svg" alt="Diagram" width="40" height="30">


Hosting & ops: Railway for app and managed PostgreSQL with environment‑stored secrets and CI/CD.<img src="Docs/Images/railway.svg" alt="Diagram" width="40" height="30">

## Project documents

Requirements Specification ([requirements_specification.md](Docs/requirements_specification.md)).

Functional Specification ([functional_specification.md](Docs/functional_specification.md)).

System Design ([system_design.md](Docs/system_design.md)).




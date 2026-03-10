import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

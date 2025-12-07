import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js"; // Importa Ziggy para generar rutas
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

interface LoginProps{
  email?: string;
}
const Login = ({ email: prefilledEmail }: LoginProps) => {
  const { data, setData, post, processing, errors } = useForm({
    email: prefilledEmail || "", 
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enviar los datos al backend
    post(route("custom.login"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-elegant)]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-serif text-primary">
            Hotel Los Cedros
          </CardTitle>
          <CardDescription className="text-lg">Iniciar Sesión</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full" variant="hero" size="lg" disabled={processing}>
              {processing ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                href={route("register")} // Ruta al formulario de registro
                className="text-primary hover:text-accent font-semibold transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
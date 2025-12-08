import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { toast } from "sonner";
import { route } from "ziggy-js";

const Register = () => {
  // Manejo del formulario con useForm
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    sexo: "",
    tipo_nacionalidad: "nacional", // Valor predeterminado
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registerUrl = route("custom.register");

    // Enviar los datos al backend  
    post(registerUrl, {
      onSuccess: () => {
        toast.success("¡Registro exitoso! Bienvenido a Hotel Los Cedros");
      },
      onError: () => {
        toast.error("Hubo un error al registrarse. Verifica los datos ingresados.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-elegant)]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-serif text-primary">
            Hotel Los Cedros
          </CardTitle>
          <CardDescription className="text-lg">
            Crear Cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="••••••••"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                required
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <select
                id="sexo"
                value={data.sexo}
                onChange={(e) => setData("sexo", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecciona tu sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo_nacionalidad">Tipo de Nacionalidad</Label>
              <select
                id="tipo_nacionalidad"
                value={data.tipo_nacionalidad}
                onChange={(e) => setData("tipo_nacionalidad", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="nacional">Nacional</option>
                <option value="extranjero">Extranjero</option>
              </select>
              {errors.tipo_nacionalidad && (
                <p className="text-red-500 text-sm">{errors.tipo_nacionalidad}</p>
              )}
            </div>
            <Button type="submit" className="w-full" variant="hero" size="lg" disabled={processing}>
              {processing ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:text-accent font-semibold transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Volver al inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
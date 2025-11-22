import { NextResponse } from "next/server";
// Ya no importamos implementaciones concretas de la capa 'backend'
import { 
  UserService, 
  PasswordHasher, 
  TokenGenerator, 
  authenticateUser, 
  AuthenticateUserData 
} from "@hotel-project/domain";

export interface AuthDependencies {
  userService: UserService;
  hasher: PasswordHasher;
  tokenGenerator: TokenGenerator;
}

// ❌ Eliminada la función getAuthDependencies() para forzar la inyección.

export async function POST(
  request: Request,
  // 🚨 IMPORTANTE: Se elimina el valor por defecto para obligar al test a inyectar el mock.
  dependencies: AuthDependencies 
) {
  try {
    
    const data: AuthenticateUserData = await request.json();
    const requiredFields = ["email", "password"] as (keyof AuthenticateUserData)[];
    // 1. Validación de campos (Missing required field -> 400)
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 } 
        );
      }
    }
    
    const result = await authenticateUser(
      data,
      dependencies.userService,
      dependencies.hasher,
      dependencies.tokenGenerator
    );
    const { password, ...userWithoutPassword } = result.user;

    // 2. Respuesta de éxito (200)
    return NextResponse.json(
      { 
        message: "Authentication successful", 
        token: result.token,
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    // 3. Manejo de error de negocio (Invalid credentials -> 401)
    if (errorMessage === "Invalid email or password") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    console.error("Internal Auth Error:", errorMessage); 
    
    // ✅ CORRECCIÓN FINAL: Aseguramos el estado 500 para el error genérico.
    return NextResponse.json({ error: errorMessage }, { status: 500 }); 
  }
}

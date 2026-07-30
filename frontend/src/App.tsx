import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background text-foreground relative">
      <header className="absolute top-4 right-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Giriş Yap</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </header>

      <h1 className="text-4xl font-bold tracking-tight text-primary">Sportify Clone</h1>

      <SignedOut>
        <p className="text-muted-foreground">Devam etmek için lütfen giriş yapın.</p>
        <SignInButton mode="modal">
          <Button size="lg">Giriş Yap / Kayıt Ol</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <p className="text-green-600 font-medium">Başarıyla giriş yaptınız!</p>
        <div className="flex gap-2">
          <Button variant="outline">Çalma Listelerim</Button>
          <Button variant="secondary">Favoriler</Button>
        </div>
      </SignedIn>
    </div>
  );
};

export default App;

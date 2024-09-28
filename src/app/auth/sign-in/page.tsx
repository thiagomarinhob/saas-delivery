import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">Cardápio</h1>
        </div>
        <h2 className="text-xl font-bold mb-6">Log In</h2>
        <form>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </Label>
            </div>
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Log In
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">or login with</p>
          <div className="flex justify-center mt-4">
            <Button className="mr-2 bg-gray-100 text-gray-800 hover:bg-gray-200">
              <span className="flex items-center">
                <span className="mr-2">G</span>Google
              </span>
            </Button>
            <Button className="bg-blue-700 text-white hover:bg-blue-600">
              <span className="flex items-center">
                <span className="mr-2">f</span>Facebook
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

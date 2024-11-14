import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch('https://api-golang-1.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const result = await res.json();

        if (res.ok && result) {
          return {
            token: result.access_token,
            userId: result.user.ID,
            email: result.user.email,
            name: result.user.name
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/' // Página de login customizada
  },
  session: {
    strategy: 'jwt' // Usando JWT para sessões
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.token;
        token.userId = user.userId;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && typeof token.id === 'string') {
        session.user.id = token.id;
        session.user.email = token.email ?? ''; // adiciona email
        session.user.name = token.name ?? ''; // adiciona name
        session.user.userId = token.userId ?? '';
      }
      return session;
    }
  }
};

export default authOptions;

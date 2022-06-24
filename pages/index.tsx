import Account from "@components/auth/Account";
import { supabase } from "@utils/supabaseClient";
import { useState, useEffect } from "react";
import Auth from "@components/auth/Auth";
import Layout from "@components/common/Layout/Layout";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  return (
    <Layout>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? <h1>No Session</h1> : <h1>Session Found</h1>}
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
    </Layout>
  );
}
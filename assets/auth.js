// assets/auth.js

async function signUpWithEmailPassword(fullName, email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName }
        }
    });
    if (error) throw error;
    return data;
}

async function signInWithEmailPassword(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}

async function signOut() {
    await supabaseClient.auth.signOut();
}

async function getSession() {
    const { data } = await supabaseClient.auth.getSession();
    return data.session;
}

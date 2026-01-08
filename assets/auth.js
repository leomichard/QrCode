// assets/auth.js
// Global app state (must exist before refreshSession uses it)
window.appState = window.appState || { session: null, profile: null };

async function signUp(fullName, email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
    });
    if (error) throw error;
    return data;
}

async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
}

async function refreshSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    window.appState.session = data.session || null;
    return window.appState.session;
}

async function logoutAndRedirect() {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
}
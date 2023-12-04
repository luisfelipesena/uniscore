test('login sets user and stores in the local storage', async () => {
    try{
    const{ login } = renderAuthProvider();
    const loggedInUser = {id: 1, token: 'token234'};
    login(loggedInUser);
    expect(screen.getByText('ChildComponent')).toBeInTheDocument();
    expect(getStoredUser()).toEqual(loggedInUser);

}catch(error){
    throw new Error('Login failed: ${error.message}');
}
});
test('logout removes user and clears local storage', ()=>{
    try{
    const{logout} = renderAuthProvider();
    logout();
    expect(screen.queryByText('Child Component')).toBeNull();
    expect(getStoredUser()).toBeNull();
}catch(error){
    throw new Error('Logout failed: ${error.message}');
}
});
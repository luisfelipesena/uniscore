test('event listener calls logout on storage event',()=>{
    const{login} = renderAuthProvider();
    try{
        login ({id:1, token: 'tokenone'});
        fireEvent(window, new Event('storage'));
        expect(screen.queryByText('Child Component')).toBeNull();
        expect(getStoredUser()).toBeNull();


    }catch(error){
        throw new Error('Event Listener in login function failed: ');
    }
});
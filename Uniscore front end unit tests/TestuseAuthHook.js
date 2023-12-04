test('useAuth returns values',()=> {
    try{
    const{result} = render.Hook(()=> useAuth(), {wrapper:AuthProvider });
    expect(result.current.user).toBeNull();
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');

    }catch(error){
        throw new Error('useAuth hook failed: ${error.message');
    }
 }
  );



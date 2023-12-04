import AuthProvider from '../src/contexts/AuthProvider';

test('AuthProvider renders children', async () => {
  try {
    render(
      <AuthProvider>
        <div>Child Component</div>
      </AuthProvider>
    );
    await screen.findByText('Child Component');
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  } catch (error) {
    throw new Error(`AuthProvider rendering failed: ${error.message}`);
  }
});

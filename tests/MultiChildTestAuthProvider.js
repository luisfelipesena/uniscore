import AuthProvider from '../src/contexts/AuthProvider';

test('AuthProvider renders multiple children', async () => {
  try {
    render(
      <AuthProvider>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
      </AuthProvider>
    );
    expect(screen.getByText('ChildComponent 1')).ToBeInTheDocument();
    expect(screen.getByText('ChildComponent 2')).ToBeInTheDocument();
  } catch (error) {
    throw new Error('AuthProvider rendering with multiple children failed');
  }
});

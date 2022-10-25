import List from './components/List';
import styled from '@emotion/styled';

const StyledApp = styled('div')(() => ({
}))

function App() {
  return (
    <StyledApp>
      <List />
    </StyledApp>
  );
}

export default App;

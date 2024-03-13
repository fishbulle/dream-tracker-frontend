import { MapDreams } from '../components/MapArchivedDreams';
import { StyledWrapper } from '../styles/styles';

export function DreamArchive() {
  return (
    <>
      {/* TODO: add option to sort on nightmare/not nightmare
          add pagination */}
      <StyledWrapper>
        <h1>dream archive</h1>
        <MapDreams />
      </StyledWrapper>
    </>
  );
}

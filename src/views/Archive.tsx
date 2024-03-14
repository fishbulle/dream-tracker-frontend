import { useContext, useEffect, useState } from 'react';
import { MapDreams } from '../components/MapDreams';
import { StyledWrapper } from '../styles/styles';
import { getAllDreamsByUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { IDream } from '../utils/dream';
import { Pagination } from '../components/common/Pagination';

export function DreamArchive() {
  const { token, userId } = useContext(AuthContext);
  const [dreams, setDreams] = useState<IDream[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const getPreviousDreams = async () => {
      try {
        const response = await getAllDreamsByUser(userId, token);
        if (response?.status == 200) return response.data;
        else return [];
      } catch (error) {
        console.error(error);
      }
    };
    getPreviousDreams().then((data) => setDreams(data));
  }, [token, userId]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentDreams = dreams.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <StyledWrapper>
        <h1>dream archive</h1>
        <MapDreams dreams={currentDreams} setDreams={setDreams} />
        <Pagination
          length={dreams.length}
          postsPerPage={postsPerPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </StyledWrapper>
    </>
  );
}

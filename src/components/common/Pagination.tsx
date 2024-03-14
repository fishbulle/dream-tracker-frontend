interface Props {
  postsPerPage: number;
  length: number;
  handlePagination: (pageNumber: number) => void;
  currentPage: number;
}

export const Pagination = (props: Props) => {
  const { postsPerPage, length, handlePagination, currentPage } = props;
  const paginationNumber: number[] = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        {paginationNumber.map((data) => (
          <button
            key={data}
            onClick={() => handlePagination(data)}
            className={currentPage === data ? 'active mx-2' : 'not-active'}
          >
            {data}
          </button>
        ))}
      </div>
    </>
  );
};

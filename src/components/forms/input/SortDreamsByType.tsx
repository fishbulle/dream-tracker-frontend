import { ChangeEvent } from 'react';
import { DreamType } from '../../../utils/dream';

// type DreamType = 'NIGHTMARE' | 'NOT_NIGHTMARE';

interface Props {
  selectedType: DreamType | undefined;
  handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SortDreamsByType = (props: Props) => {
  const { selectedType, handleStatusChange } = props;

  return (
    <div className='form-group mb-3'>
      <label htmlFor='statusSelect' className='fw-bold mb-1'>
        filter by type
      </label>
      <select
        id='statusSelect'
        className='form-control'
        value={selectedType}
        onChange={handleStatusChange}
      >
        <option value={''}>show all dreams</option>
        <option value={'NOT_NIGHTMARE' as DreamType}>normal</option>
        <option value={'NIGHTMARE' as DreamType}>nightmares</option>
      </select>
    </div>
  );
};

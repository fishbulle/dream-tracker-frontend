import { ChangeEvent } from 'react';
import { DreamType } from '../../../utils/dream';

interface Props {
  selectedType: DreamType | undefined;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SortDreamsByType = (props: Props) => {
  const { selectedType, handleChange } = props;

  return (
    <div className='form-group mb-3 mt-3 d-flex flex-column align-items-center'>
      <label htmlFor='type select' className='mb-2'>
        filter by type
      </label>
      <select
        id='type select'
        className='form-control w-auto text-center'
        value={selectedType}
        onChange={handleChange}
      >
        <option value={''}>show all dreams</option>
        <option value={'NOT_NIGHTMARE' as DreamType}>normal</option>
        <option value={'NIGHTMARE' as DreamType}>nightmares</option>
      </select>
    </div>
  );
};

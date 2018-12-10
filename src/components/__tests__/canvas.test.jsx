import { shallow } from 'enzyme';
import Canvas from '../Canvas/canvas';

describe('BaseButton', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Canvas />);
      expect(wrapper).toMatchSnapshot();
      // On the first run of this test, Jest will generate a snapshot file automatically.
    });
  });
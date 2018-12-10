import { shallow } from 'enzyme';
import Canvas from '../Canvas/canvas';

describe('Canvas', () => {
  describe('when user clicks button', () => {
    it ('calls correct function to save the information', () => {
      const onButtonClickMock = jest.fn();
      const wrapper = shallow(
        <Canvas
          onButtonClick={onButtonClickMock}
        />,
      );
      const buttonElement = wrapper.find(Canvas); // step 1 above
      buttonElement.simulate('click'); // step 2
      
      expect(onButtonClickMock).toHaveBeenCalledTimes(1); // step 3
      expect(onButtonClickMock).toHaveBeenCalledWith(true);
    });
  });
});
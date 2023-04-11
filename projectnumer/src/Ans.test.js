import Falseposition from './Root of Equation/Falsepositon'; 
import {render, screen, fireEvent} from '@testing-library/react'

describe('Bisection Front Test',()=>{
  it('Bisection component', async ()=>{
    const { getByTestId } = render(<Falseposition />);
    const fx = screen.getByTestId('equation');
    const xl = screen.getByTestId('xl');
    const xr = screen.getByTestId('xr');
    const cal = screen.getByTestId('Cal');
     
      fireEvent.change(fx, { target: { value: '(x^2)-7' } });
      fireEvent.change(xl, { target: { value: 1 } });
      fireEvent.change(xr, { target: { value: 3 } });
      console.log(fx.value)
      console.log(xl.value)
      console.log(xr.value)
      fireEvent.click(cal);
  
      const ans = screen.getByTestId('result');
      console.log(ans.textContent)

      expect(ans.textContent).toBe("result = 2.645751165292219");
  })
})
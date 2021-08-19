import React from 'react';
import ReactDOM from 'react-dom';
import App, {Todo,TodoForm,useTodos} from './App';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()});

describe('App',() => {

  describe('Todo',() => {
    
    it('Ejecuta completeTodo cuando pincho complete', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo={
        isCompleted:true,
        text:"lala"
      }
      const wrapper = shallow(
      <Todo 
      completeTodo={completeTodo} 
      removeTodo={removeTodo}
      index={index}
      todo={todo}
      />)

      wrapper.find('button').at(0).simulate('click');
      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    it('Ejecuta removeTodo cuando pincho remove', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo={
        isCompleted:true,
        text:"lala"
      }
      const wrapper = shallow(
      <Todo 
      completeTodo={completeTodo} 
      removeTodo={removeTodo}
      index={index}
      todo={todo}
      />)

      wrapper.find('button').at(1).simulate('click');
      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });

  });

  describe('TodoForm',() => {

    it('llamar a addTodo cuando el formulario tiene un valor',() => {
        const addTodo = jest.fn();
        const prevent=jest.fn();
        const wrapper = shallow(<TodoForm addTodo={addTodo}/>);
        wrapper.find('input').simulate('change',{target:{ value: 'Mi nuevo To Do!'}});
        wrapper.find('form').simulate('submit',{ preventDefault : prevent });
        expect(addTodo.mock.calls).toEqual([['Mi nuevo To Do!']]);
        expect(prevent.mock.calls).toEqual([[]]);
    });
  });

  describe('Custom Hooks: useTodos',() => {

    it('addTodo',() => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>
    }
       const wrapper = shallow(<Test hook={useTodos}/>);
       let props = wrapper.find('div').props();
        props.addTodo('texto de prueba');
        props = wrapper.find('div').props();
        expect(props.todos[0].text).toEqual('texto de prueba');
    });

    it('completeTodo',() => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>
    }
       const wrapper = shallow(<Test hook={useTodos}/>);
       let props = wrapper.find('div').props();
        props.completeTodo(0);
        props = wrapper.find('div').props();
        expect(props.todos[0].isCompleted).toEqual(true);
    });

    it('removeTodo',() => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>
    }
       const wrapper = shallow(<Test hook={useTodos}/>);
       let props = wrapper.find('div').props();
        props.removeTodo(0);
        expect(props.todos).toEqual([
          {
            text: "Todo 1",
            isCompleted: false
          },
          {
            text: "Todo 2",
            isCompleted: false
          },
          {
            text: "Todo 3",
            isCompleted: false
          }
        ]);
    });

  });

  describe('App',() => {
      
    it('App integration test',() => {
        const wrapper = mount(<App />);
        const prevent = jest.fn();
        wrapper
        .find('input')
        .simulate('change',{target : { value : 'miTodo' }});

        wrapper
        .find('form')
        .simulate('submit',{ preventDefault: prevent});

        const respuesta = wrapper
        .find('.todo')
        .at(0)
        .text()
        .includes('miTodo');

        expect(respuesta).toEqual(true);
        expect(prevent.mock.calls).toEqual([[]]);
        
    });
  });

});
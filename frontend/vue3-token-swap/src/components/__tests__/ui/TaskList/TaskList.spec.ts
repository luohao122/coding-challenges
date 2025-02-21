import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TokenPriceList from '../../../ui/TokenPriceList/TokenPriceList.vue'

// Stub TaskItem: it renders a div with the task title and emits events when clicked.
const TaskItemStub = {
  template: `<div class="task-item-stub" @click="$emit('select', task.id)" @click.stop="$emit('toggle', task.id)">
               {{ task.title }}
             </div>`,
  props: ['task'],
}

describe('TokenPriceList', () => {
  const tasks = [
    {
      id: '1',
      title: 'Task One',
      description: 'Description One',
      priority: 'High',
      bgColor: '#F2994A',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Task Two',
      description: 'Description Two',
      priority: 'Low',
      bgColor: '#F2C94C',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  it('renders the correct number of TaskItem components', () => {
    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        stubs: { TaskItem: TaskItemStub },
      },
    })
    const items = wrapper.findAll('.task-item-stub')
    expect(items.length).toBe(tasks.length)
  })

  it('emits "select" event when a TaskItem is clicked', async () => {
    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        stubs: { TaskItem: TaskItemStub },
      },
    })
    const firstItem = wrapper.find('.task-item-stub')
    await firstItem.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0][0]).toBe('1')
  })

  it('emits "toggle" event when a TaskItem checkbox is clicked', async () => {
    // Since our stub emits both "select" and "toggle" on the same click,
    // we simulate a click on the stub and ensure both events are emitted.
    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        stubs: { TaskItem: TaskItemStub },
      },
    })
    const firstItem = wrapper.find('.task-item-stub')
    await firstItem.trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')?.[0][0]).toBe('1')
  })
})

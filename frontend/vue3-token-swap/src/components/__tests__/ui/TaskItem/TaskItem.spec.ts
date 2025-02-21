import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { LucideCheckSquare } from 'lucide-vue-next'

import dayjs from 'dayjs'

import TaskItem from '../../../ui/TaskItem/TaskItem.vue'
import type { Task } from '../../../../types/task'

// Create a sample task for testing.
const sampleTask: Task = {
  id: 'test-1',
  title: 'Test Task',
  description: 'This is a test task.',
  priority: 'High',
  bgColor: '#f2994a',
  completed: false,
  createdAt: new Date('2025-01-01T00:00:00Z').toISOString(),
  updatedAt: new Date('2025-01-01T00:00:00Z').toISOString(),
}

describe('TaskItem', () => {
  it('renders task title and formatted date', () => {
    const wrapper = mount(TaskItem, {
      props: { task: sampleTask },
    })
    // Check that the title is rendered.
    expect(wrapper.text()).toContain('Test Task')
    // Check that the date is formatted (e.g. "Jan 1, 2025")
    const expectedDate = dayjs(sampleTask.createdAt).format('MMM D, YYYY')
    expect(wrapper.text()).toContain(expectedDate)
  })

  it('applies the dynamic border color style', () => {
    const wrapper = mount(TaskItem, {
      props: { task: sampleTask },
    })
    // Check the inline style for the checkbox should have borderColor equal to sampleTask.bgColor.
    const checkboxDiv = wrapper.find('div.w-8.h-8.rounded-full')
    expect(checkboxDiv.exists()).toBe(true)
    // Access inline style property.
    expect((checkboxDiv.element as HTMLElement).style.borderColor).toBe(sampleTask.bgColor)
  })

  it('renders the LucideCheckSquare when task is completed', () => {
    const completedTask = { ...sampleTask, completed: true }
    const wrapper = mount(TaskItem, {
      props: { task: completedTask },
    })
    // Check that the LucideCheckSquare component exists.
    const icon = wrapper.findComponent(LucideCheckSquare)
    expect(icon.exists()).toBe(true)
  })

  it('emits "select" event when the RoundedCard is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: sampleTask },
    })
    await wrapper.trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0][0]).toBe(sampleTask.id)
  })

  it('emits "toggle" event when the checkbox is clicked and does not bubble to select', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: sampleTask },
    })
    // Find the checkbox div with inline style.
    const checkboxDiv = wrapper.find('div.w-8.h-8.rounded-full')
    await checkboxDiv.trigger('click')
    // The toggle event should be emitted.
    const toggleEmitted = wrapper.emitted('toggle')
    expect(toggleEmitted).toBeTruthy()
    expect(toggleEmitted?.[0][0]).toBe(sampleTask.id)
    // The select event should not be emitted as a result of clicking the checkbox.
    const selectEmitted = wrapper.emitted('select')
    expect(selectEmitted).toBeFalsy()
  })
})

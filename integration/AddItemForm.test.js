describe('AddItemForm', () => {
  it('base example, visually looks correct,', async () => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/task-component--add-item-form-base-example');
    const image = await page.sceenshot();

    expect(image).toMatchImageSnapshot();
  });
})
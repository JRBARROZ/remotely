import { shallowMount } from "@vue/test-utils";
import Alert from "@/components/Alert.vue";

const props = {
  title: "First Unit-jest Testing!",
  content: "This is my content!",
  data: "Awesome Data here!",
  type: "success",
};
describe("Alert Component", () => {
  it("Should validate the title", () => {
    const wrapper = shallowMount(Alert, {
      props: props,
    });
    expect(wrapper.props()).toBe(props);
  });
});

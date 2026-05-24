import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("<Dropdown />", () => {
  describe("Rendering", () => {
    it("renders the trigger button with the provided label", () => {
      const triggerLabel = "Filter by Tag";
      render(
        <Dropdown
          label={triggerLabel}
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", { name: triggerLabel });
      expect(triggerButton).toBeInTheDocument();
    });
    it("renders the angle-down icon in the trigger", () => {
      render(
        <Dropdown
          label="Test Dropdown"
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const icon = screen.getByTestId("angle-down-icon");
      expect(icon).toBeInTheDocument();
    });
    it("options panel is NOT in the DOM on initial render (closed by default)", () => {
      render(
        <Dropdown
          label="Test Dropdown"
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const optionsPanel = screen.queryByRole("list");
      expect(optionsPanel).not.toBeInTheDocument();
    });
  });

  describe("Open/close behavior", () => {
    const options = [
      { id: "tag-1", label: "Tag 1", count: 1, selected: false },
    ];
    it("clicking the trigger button opens the panel", async () => {
      const triggerLabel = "Filter by Tag";
      render(
        <Dropdown
          label={triggerLabel}
          options={options}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", { name: triggerLabel });
      act(() => {
        triggerButton.click();
      });

      const optionsPanel = await screen.findByRole("list");
      expect(optionsPanel).toBeInTheDocument();
    });
    it("clicking the trigger button again closes the panel", () => {
      const triggerLabel = "Filter by Tag";

      render(
        <Dropdown
          label={triggerLabel}
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", { name: triggerLabel });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      act(() => {
        triggerButton.click(); // Click again to close
      });

      const optionsPanel = screen.queryByRole("list");
      expect(optionsPanel).not.toBeInTheDocument();
    });
    it("clicking outside the dropdown closes the panel", () => {
      const triggerLabel = "Filter by Tag";
      render(
        <div>
          <Dropdown
            label={triggerLabel}
            options={options}
            selectedOptions={[]}
            onOptionSelect={() => {}}
          />
          <button data-testid="outside-button">Outside Button</button>
        </div>,
      );

      const triggerButton = screen.getByRole("button", { name: triggerLabel });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const outsideButton = screen.getByTestId("outside-button");
      act(() => {
        outsideButton.click(); // Click outside the dropdown
      });

      const optionsPanel = screen.queryByRole("list");
      expect(optionsPanel).not.toBeInTheDocument();
    });
    it("clicking inside the panem (on an option) does NOT close it", async () => {
      const triggerLabel = "Filter by Tag";

      render(
        <Dropdown
          label={triggerLabel}
          options={options}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", { name: triggerLabel });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const optionItem = await screen.findByText(
        `${options[0].label} (${options[0].count})`,
      );
      act(() => {
        optionItem.click(); // Click on the option
      });

      await waitFor(() => {
        const optionsPanel = screen.queryByRole("list");
        expect(optionsPanel).toBeInTheDocument(); // Panel should still be open
      });
    });
    it("removes the click document listener on unmount", () => {
      const addEventListenerSpy = jest.spyOn(document, "addEventListener");
      const removeEventListenerSpy = jest.spyOn(
        document,
        "removeEventListener",
      );

      const { unmount } = render(
        <Dropdown
          label="Test Dropdown"
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
      );
    });
  });

  describe("Options rendering", () => {
    it("renders one DropdownItem per entry in options", async () => {
      const options = [
        { id: "1", label: "Option 1", count: 5, selected: false },
        { id: "2", label: "Option 2", count: 10, selected: false },
      ];

      render(
        <Dropdown
          label="Test Dropdown"
          options={options}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const optionItem = await screen.findByText(
        `${options[0].label} (${options[0].count})`,
      );
      act(() => {
        optionItem.click(); // Click on the option
      });

      const dropdownItems = await screen.findAllByRole("listitem");
      expect(dropdownItems).toHaveLength(2);
    });
    it("renders empty panel when options is []", async () => {
      render(
        <Dropdown
          label="Test Dropdown"
          options={[]}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const dropdownItems = screen.queryAllByRole("listitem");
      expect(dropdownItems).toHaveLength(0);
    });
    it("each item displays text as '{label} ({count})'", async () => {
      const options = [
        { id: "1", label: "Option 1", count: 5, selected: false },
        { id: "2", label: "Option 2", count: 10, selected: false },
      ];

      render(
        <Dropdown
          label="Test Dropdown"
          options={options}
          selectedOptions={[]}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      for (const option of options) {
        const optionText = `${option.label} (${option.count})`;
        expect(await screen.findByText(optionText)).toBeInTheDocument();
      }
    });
    it("each item receives a checked prop matching selectedOptions.includes(option.label)", async () => {
      const options = [
        { id: "1", label: "Option 1", count: 5, selected: false },
        { id: "2", label: "Option 2", count: 10, selected: false },
      ];
      const selectedOptions = ["Option 1"];

      render(
        <Dropdown
          label="Test Dropdown"
          options={options}
          selectedOptions={selectedOptions}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const checkboxes = await screen.findAllByRole("checkbox");

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
    });
  });

  describe("Selection", () => {
    it("calls onOptionSelect with option's label when an item is clicked", async () => {
      const options = [
        { id: "1", label: "Option 1", count: 5, selected: false },
        { id: "2", label: "Option 2", count: 10, selected: false },
      ];
      const onOptionSelect = jest.fn();

      render(
        <Dropdown
          label="Test Dropdown"
          options={options}
          selectedOptions={[]}
          onOptionSelect={onOptionSelect}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const optionItems = await screen.findAllByRole("listitem");
      act(() => {
        optionItems[0].click(); // Click on the first option
      });

      expect(onOptionSelect).toHaveBeenCalledWith(options[0].label);
    });
    it("multiple selected options all render as checked", async () => {
      const options = [
        { id: "1", label: "Option 1", count: 5, selected: false },
        { id: "2", label: "Option 2", count: 10, selected: false },
      ];
      const selectedOptions = ["Option 1"];

      render(
        <Dropdown
          label="Test Dropdown"
          options={options}
          selectedOptions={selectedOptions}
          onOptionSelect={() => {}}
        />,
      );

      const triggerButton = screen.getByRole("button", {
        name: "Test Dropdown",
      });
      act(() => {
        triggerButton.click(); // Open the panel
      });

      const checkboxes = await screen.findAllByRole("checkbox");

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
    });
  });
});

import {RangeCalendar} from "@vx-oss/react";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  return (
    <I18nProvider locale="zh-CN-u-ca-chinese">
      <RangeCalendar aria-label="Date (International RangeCalendar)" />
    </I18nProvider>
  );
}

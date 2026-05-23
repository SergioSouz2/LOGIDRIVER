import { theme } from '@/theme/themes';
import { ScrollView, Text, View } from 'react-native';

const { colors, font, radius } = theme;

export default function DesignSystem() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 24, paddingTop: 60, gap: 28 }}
    >
      {/* CORES */}
      <Label>CORES</Label>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {Object.entries(colors).map(([name, value]) => (
          <View key={name} style={{ alignItems: 'center', width: 68 }}>
            <View style={{ width: 68, height: 44, borderRadius: radius.md, backgroundColor: value, borderWidth: 1, borderColor: colors.border }} />
            <Text style={{ color: colors.textSub, fontSize: 9, fontFamily: font.body, marginTop: 4, textAlign: 'center' }}>{name}</Text>
          </View>
        ))}
      </View>

      {/* TIPOGRAFIA */}
      <Label>TIPOGRAFIA</Label>
      <Text style={{ color: colors.text, fontSize: 36, fontFamily: font.display, letterSpacing: 2 }}>LOGIDRIVER</Text>
      <Text style={{ color: colors.text, fontSize: 16, fontFamily: font.body, fontWeight: '600' }}>Body Semibold</Text>
      <Text style={{ color: colors.textSub, fontSize: 13, fontFamily: font.body }}>Body Regular — texto secundário</Text>
      <Text style={{ color: colors.primary, fontSize: 20, fontFamily: font.mono }}>07:32:14</Text>

      {/* RADIUS */}
      <Label>RADIUS</Label>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-end' }}>
        {Object.entries(radius).map(([name, value]) => (
          <View key={name} style={{ alignItems: 'center', gap: 4 }}>
            <View style={{ width: 56, height: 56, borderRadius: value, backgroundColor: colors.primaryGlow, borderWidth: 1.5, borderColor: colors.primary }} />
            <Text style={{ color: colors.textSub, fontSize: 9, fontFamily: font.body }}>{name}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 9, fontFamily: font.mono }}>{value}px</Text>
          </View>
        ))}
      </View>

      {/* SHADOW */}
      <Label>SHADOW</Label>
      <View style={{ gap: 12 }}>
        {([
          { label: 'Card', shadowColor: '#000', offset: 2, opacity: 0.4, blur: 8, elevation: 4 },
          { label: 'Float', shadowColor: '#000', offset: 8, opacity: 0.5, blur: 16, elevation: 12 },
          { label: 'Glow', shadowColor: colors.primary, offset: 0, opacity: 0.35, blur: 12, elevation: 8 },
        ] as const).map((s) => (
          <View key={s.label} style={{
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            padding: 16,
            shadowColor: s.shadowColor,
            shadowOffset: { width: 0, height: s.offset },
            shadowOpacity: s.opacity,
            shadowRadius: s.blur,
            elevation: s.elevation,
          }}>
            <Text style={{ color: colors.text, fontSize: 14, fontFamily: font.body, fontWeight: '600' }}>{s.label} Shadow</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Label({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Text style={{ color: colors.textMuted, fontSize: 11, fontFamily: font.body, fontWeight: '700', letterSpacing: 2 }}>{children}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
    </View>
  );
}




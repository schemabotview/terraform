import type { Section } from '../types'

export const unknownValues: Section = {
  id: 'unknown-values',
  title: 'Unknown values and plan-time limits',
  scene: 'unknown-values',
  focus: 'unknown-key',
  slide: `## Unknown values, known keys

Some values exist only after apply: generated names, IDs, addresses. A plan shows them as \`(known after apply)\`.

### Unknown values are fine
- \`input = random_pet.env.id\` plans normally
- Whatever depends on it is unknown too, until apply

### Unknown keys are not
- \`for_each\` and \`count\` decide **how many** instances exist
- The plan must know that, so keys must be known at plan time
- Keep keys static; let only the values be unknown

### The same rule for count
- \`count\` must also be known when planning
- Derive it from inputs, not from new resources

### Keys are visible
- Instance keys appear in addresses, plans and state
- So a sensitive value cannot become a \`for_each\` key`,
  narration:
    "Plans are made before anything is created, so some values simply do not exist yet. A generated name, a cloud-assigned ID, an IP address: the plan shows these as known after apply. That is normal, and Terraform handles it well. On the left, the tag resource takes the generated pet name as its input, and it plans without complaint. Its own output becomes unknown too, and everything is filled in during apply. Keys are a different matter. for each and count decide how many instances of a resource exist, and what each one is called. A plan has to answer that question, because the number of instances is the plan. So when the web resource tries to build its for each keys from the generated name, Terraform stops with the error you can see: the keys depend on something that cannot be determined until apply. The fix is a design rule worth remembering. Keep keys static, written in your configuration, and let only the values attached to them be unknown. There is one more rule about keys. They appear in addresses, in plans and in state, in plain sight. That is why Terraform refuses to use a sensitive value as a for each key, as the second error shows.",
}

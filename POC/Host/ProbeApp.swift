import SwiftUI

@main
struct ProbeApp: App {
    var body: some Scene {
        WindowGroup {
            VStack(alignment: .leading, spacing: 16) {
                Text(ProductConfiguration.displayName).font(.largeTitle)
                Text("Quick Look compatibility probe").font(.title2)
                Text("This is a routing experiment, not the production inspector.")
                Text("Generate synthetic fixtures, select a file in Finder, then press Space. A successful custom preview displays PEEK PREVIEW PROBE. A custom thumbnail displays PEEK THUMB.")
                Text("Opening this app does not prove either extension is enabled. Record the actual Finder result for every file in the compatibility matrix.")
                Text("The probe reads at most 32 bytes to test access. It never displays file contents or writes to the selected file.")
                Text("Version \(ProductConfiguration.version)").foregroundStyle(.secondary)
            }
            .padding(28)
            .frame(width: 560)
        }
    }
}
